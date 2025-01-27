import css from "./HomePage.module.css";
import CreatePostNav from "../CreatePostNav/CreatePostNav";
import Post from "../Post/Post";
import { useState, useEffect } from "react";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

const HomePage = () => {
    const [isShow, setIsShow] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [topics, setTopics] = useState([]);

    const handleSetTitle = (titleText) => {
        setTitleText(titleText);
    }

    const handleCloseModal = () => {
        setIsShow(false);
    };

    useEffect(() => {
        const fetchTopics= async() => {
            try {
                const res = await fetch("http://localhost:8080/api/topics");
                const data = await res.json();
                console.log(data.body)
                setTopics(data.body);
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        }
        fetchTopics();
    }, [])

    useEffect(() => {
        console.log(topics)
    })

    return (
        <div className={`${css.homePageContainer} ${isShow ? css.dimmed : ""}`}>
            <div>
                <CreatePostNav handleSetTitle={handleSetTitle} setIsShow={setIsShow} />
                <div style={{display: "flex", flexWrap: "nowrap", flexDirection: "column"}}>
                    {topics?.map(topic => (
                        <Post key={topic.id} topic={topic} />
                    ))}
                </div>
            </div>

            <CreatePostModal titleText = {titleText} isShow={isShow} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default HomePage;
