import React, { useEffect, useState } from "react"
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let Home = (props) => {

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const [ageRes, genderRes] = await Promise.all([
                    axios.get("http://localhost:9000/report/api/reports/age-distribution"),
                    axios.get("http://localhost:9000/report/api/reports/gender-distribution"),
                ]);

                const ageData = ageRes.data;
                const ageTotal = ageData.reduce((sum, d) => sum + d.count, 0);
                const ageStrings = ageData
                .filter(d => d.count > 0)
                .map(
                    d =>
                    `${((d.count / ageTotal) * 100).toFixed(1)}% of doses went to people aged ${d.label}`
                );

                const genderData = genderRes.data;
                const genderTotal = genderData.reduce((sum, d) => sum + d.count, 0);
                const genderStrings = genderData.map(
                d =>
                    `${((d.count / genderTotal) * 100).toFixed(1)}% of doses went to ${d.label.toLowerCase()}s`
                );

                setSlides([...genderStrings, ...ageStrings]);
            } catch (err) {
                console.error("Error loading report data:", err);
            }
        };

        loadReports();
    }, []);

    const settings = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return(
        <div className="h-auto w-full bg-neutral-100 flex flex-col rounded-4xl mx-auto p-10">
            <div className="self-start p-4 mb-20">
                <h1 className="text-3xl font-bold">Welcome to ImmunoSuite, where we cover your vaccination needs!</h1>
            </div>
            <div className="w-[80%] flex-grow mx-auto">
                <div className="overflow-hidden rounded-xl">
                    <p className="text-gray-600 mt-1">Vaccination Stats</p>
                    <Slider {...settings}>
                    {slides.map((text, idx) => (
                        <div className="h-[500px]">
                            <div
                                key={idx}
                                className="h-full flex justify-center items-center bg-red-800 shadow"
                            >
                            <h3 className="text-5xl text-white">{text}</h3>
                            </div>
                        </div>
                    ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Home