let expressObj = require("express")
let reportRouter = expressObj.Router({})

let AppointmentModel = require("../data-model/AppointmentDataModel")

reportRouter.get("/api/reports/age-distribution", async (req, res) => {
    try {
      const currentDate = new Date();
      /*
      * This pipeline is a series of steps that is performed to get the results needed for the age-distribution
      * api call. It does the following:
      * 1. Finds appointments where the "appointmentDate" field is before or on the current date and the appointment was paid: isPaid === true
      * 2. Adds the users age
      * 3. Using the age field, groups the appointments into buckets by age group: 0-18, 19-30, 31-50, 51-65, 66+ (max 121)
      */
      const pipeline = [
        {
          $match: {
            isPaid: true,
            appointmentDate: { $lte: currentDate }
          }
        },
        {
          $addFields: {
            age: "$patient.age"
          }
        },
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [0, 19, 31, 51, 66, 121],
            default: "Unknown",
            output: {
              count: { $sum: 1 }
            }
          }
        }
      ];
  
      const rawResults = await AppointmentModel.aggregate(pipeline);
  
      const formattedResults = [
        { ageGroup: "0-18", count: 0 },
        { ageGroup: "19-30", count: 0 },
        { ageGroup: "31-50", count: 0 },
        { ageGroup: "51-65", count: 0 },
        { ageGroup: "66+", count: 0 }
      ];
  
      rawResults.forEach(result => {
        const age = result._id;
        if (age === 0) formattedResults[0].count = result.count;
        else if (age === 19) formattedResults[1].count = result.count;
        else if (age === 31) formattedResults[2].count = result.count;
        else if (age === 51) formattedResults[3].count = result.count;
        else if (age === 66) formattedResults[4].count = result.count;
      });
  
      res.status(200).json(formattedResults);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
}); 

module.exports = reportRouter;