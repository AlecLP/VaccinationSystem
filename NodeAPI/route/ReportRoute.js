let expressObj = require("express")
let reportRouter = expressObj.Router({})

let AppointmentModel = require("../data-model/AppointmentDataModel")

reportRouter.get("/api/reports/age-distribution", async (req, res) => {
    console.log("Getting reports by age distribution")
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
        { label: "0-18", count: 0 },
        { label: "19-30", count: 0 },
        { label: "31-50", count: 0 },
        { label: "51-65", count: 0 },
        { label: "66+", count: 0 }
      ];
  
      rawResults.forEach(result => {
        const age = result._id;
        if (age === 0) formattedResults[0].count = result.count;
        else if (age === 19) formattedResults[1].count = result.count;
        else if (age === 31) formattedResults[2].count = result.count;
        else if (age === 51) formattedResults[3].count = result.count;
        else if (age === 66) formattedResults[4].count = result.count;
      });
      console.log("Reports found: ", formattedResults)
      res.status(200).json(formattedResults);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
}); 

reportRouter.get("/api/reports/gender-distribution", async (req, res) => {
  console.log("Getting reports by gender")
  try {
    const result = await AppointmentModel.aggregate([
      {
        $match: {
          isPaid: true,
          appointmentDate: { $lte: new Date() },
        },
      },
      {
        $group: {
          _id: "$patient.gender",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    result.sort((a, b) => a.label.localeCompare(b.label))
    console.log("Reports found: ", result)
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

reportRouter.get("/api/reports/disease-distribution", async (req, res) => {
  console.log("Getting reports by disease")
  try {
    const result = await AppointmentModel.aggregate([
      {
        $match: {
          isPaid: true,
          appointmentDate: { $lte: new Date() },
        },
      },
      {
        $group: {
          _id: "$patient.diseaseInfo",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          label: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    result.sort((a, b) => a.label.localeCompare(b.label))
    console.log("Reports found: ", result)
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

reportRouter.get("/api/reports/practicioner-distribution", async (req, res) => {
  console.log("Getting reports by practicioner")
  try {
    const result = await AppointmentModel.aggregate([
      {
        $match: {
          isPaid: true,
          appointmentDate: { $lte: new Date() },
        },
      },
      {
        $group: {
          _id: {
            $concat: ["$approver.firstName", " ", "$approver.lastName"]
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          label: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    result.sort((a, b) => a.label.localeCompare(b.label))
    console.log("Reports found: ", result)
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

reportRouter.get("/api/reports/doses-per-day", async (req, res) => {
  console.log("Getting reports of doses per day")
  try {
    const result = await AppointmentModel.aggregate([
      {
        $match: {
          isPaid: true,
          appointmentDate: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 14)),
            $lte: new Date()
          }
        }        
      },
      {
        $addFields: {
          dateOnly: {
            $dateToString: { format: "%Y-%m-%d", date: "$appointmentDate" },
          },
        },
      },
      {
        $group: {
          _id: "$dateOnly",
          count: { $sum: "$vaccine.dosesRequired" },
        },
      },
      {
        $project: {
          label: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { label: 1 },
      },
    ]);
    console.log("Reports found: ", result)
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = reportRouter;