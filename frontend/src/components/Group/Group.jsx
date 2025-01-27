import css from "./Group.module.css";
import Image from '../../img/groupIcon.png';
import SabsImage from '../../img/sabs.png';
import ImgPost1 from '../../img/ImgPost1.png';
import ImgPost2 from '../../img/ImgPost2.png';
import ImgPost3 from '../../img/imgPost3.png';
import mainPostImg from '../../img/mainPostImg.png';
import SabsActiveImage from '../../img/subsActive.png';
import Icon from '../../img/sprite.svg';
import GroupPost from "./GroupPost";
import useWindowWidth from '../hooks/useWindowWidth';
import GroupPinnedPosts from './GroupPinnedPosts';


const Group = () => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 460;

    return (
        <>
            {!isMobile ? (
                <div className={css.groupContainer}>
                    <div className={css.groupTitleContainer}>
                        <div className={css.groupTitleContainerItem}>
                            <img src={Image} height={90} width={90} className={css.imgTitle}/>
                            <div>
                                <p className={css.groupTitle}>ФільмиУкраїнською</p>
                                <p className={css.groupSubTitle}>82,645 Постів у цій групі</p>
                            </div>
                        </div>
                        <div className={css.groupTitleContainerItem}>
                            <button className={css.groupButtonCreate}>Створити пост</button>
                            <button className={css.groupButton}>Приєднатися</button>
                            <svg width={50} height={50}>
                                <use href={`${Icon}#moreIcon`}></use>
                            </svg>
                        </div>
                    </div>
                    <div className={css.groupDataContainer}>
                        <div className={css.groupInfoContainer}>
                        <p className={css.groupDataText} style={{ marginBottom: 15 }}>
                                <strong style={{ fontSize: 18 }}>Опис:</strong> ця група створена для користувачів, які хочуть
                                першими дізнаватися найцікавішу інформацію про українські фільми
                            </p>
                            <p className={css.groupDataText} style={{ marginBottom: 22 }}>
                                <strong style={{ fontSize: 18 }}>Правила:</strong> заборонена неетична поведінка, шкідливе
                                програмне забезпечення, порушення конфіденційності, спам і фальшиві облікові записи, а також способи
                                обходу цих заборон.
                            </p>
                            <ul className={css.groupTagsContainer}>
                                <li className={css.groupTag}>#Українською</li>
                                <li className={css.groupTag}>#Фільми</li>
                                <li className={css.groupTag}>#Інформативно</li>
                            </ul>
                        </div>
                        <div className={css.groupStatsContainer}>
                            <div className={css.groupSabs}>
                                <img src={SabsImage} height={19} width={15} />
                                <p className={css.groupSabsText}>317,731 підписники</p>
                            </div>
                            <div className={css.groupSabs}>
                                <img src={SabsActiveImage} height={19} width={15} />
                                <p className={css.groupSabsText}>37,731 онлайн</p>
                            </div>
                            <button className={css.groupStatusBtn}>Публічний</button>
                            <p style={{ fontSize: 14 }} className={css.groupSabsText}>Група створена: 31.12.2024</p>
                        </div>
                    </div>

                    <div className={css.groupPinnedPostContainer}>
                        <div className={css.groupPinnedPostWrapper}>
                            <div className={css.groupPinnedPostTitleContainer}>
                                <svg width={30} height={32}>
                                    <use href={`${Icon}#pinIcon`} />
                                </svg>
                                <p className={css.groupPinnedPostTitle}>Закріплені пости</p>
                            </div>
                            {/*<svg width={28} height={24}>*/}
                            {/*    <use href={`${Icon}#iconArrowDown`} />*/}
                            {/*</svg>*/}
                        </div>
                        <div className={css.groupPinnedPostMain} >
                            <div className={css.groupPinnedPost}>
                                <img style={{ marginBottom: 8 }} src={ImgPost1} />
                                <p className={css.groupPinnedPostTitle}>Найкращий фільм 2024 року, чи черговий хайп? </p>
                            </div>
                            <div className={css.groupPinnedPost}>
                                <img style={{ marginBottom: 8 }} src={ImgPost2} />
                                <p className={css.groupPinnedPostTitle}>А взагалі є сенс це дивитися? Це ж вже було... </p>
                            </div>
                            <div className={css.groupPinnedPost}>
                                <img style={{ marginBottom: 8 }} src={ImgPost3} />
                                <p className={css.groupPinnedPostTitle}>Захар Беркут чи Беркут Захар? Ось в чому питання... </p>
                            </div>
                        </div>
                    </div>
                    <GroupPost
                        img=""
                        title="Завтра виходить новий УКРАЇНСЬКИЙ фільм “Гонки. Моя остання місія”. Хтось вже має трейлер щоб глянути?"
                    />
                    <GroupPost img={mainPostImg} title="Ти його ще не бачив? Ну ти й клоун. На, дивись" />
                </div>
            ) : (
                <div className={css.groupContainer}>
                    <div className={css.groupTitleContainer}>
                        <div className={css.groupTitleContainerItem}>
                            <img src={Image} height={90} width={90} className={css.imgTitle}/>
                            <div className={css.groupTitleMain}>
                                <p className={css.groupTitle}>ФільмиУкраїнською</p>
                                <p className={css.groupSubTitle}>82,645 Постів </p>
                            </div>
                        </div>
                        <div className={css.groupTitleContainerItem}>
                            <button className={css.groupButtonCreate_Mobile}>+</button>
                            <button className={css.groupButton}>Доєднатися</button>
                            {/*<svg width={50} height={50} className={css.moreSign}>*/}
                            {/*    <use href={`${Icon}#moreIcon`}></use>*/}
                            {/*</svg>*/}
                        </div>
                    </div>

                    <div className={css.groupDataContainer}>
                        <div className={css.groupInfoContainer}>
                            <p className={css.groupDataText} style={{marginBottom: 15}}>
                                <strong style={{fontSize: 18}}>Опис:</strong> ця група створена для користувачів, які
                                хочуть
                                першими дізнаватися найцікавішу інформацію про українські фільми
                            </p>
                            <p className={css.groupDataText} style={{marginBottom: 22}}>
                                <strong style={{fontSize: 18}}>Правила:</strong> заборонена неетична поведінка, шкідливе
                                програмне забезпечення, порушення конфіденційності, спам і фальшиві облікові записи, а
                                також способи
                                обходу цих заборон.
                            </p>
                            <ul className={css.groupTagsContainer}>
                                <li className={css.groupTag}>#Українською</li>
                                <li className={css.groupTag}>#Фільми</li>
                                <li className={css.groupTag}>#Інформативно</li>
                            </ul>
                        </div>
                    </div>
                    <div className={css.groupScrollandStatus}>
                        <div className={css.groupPinnedPostContainerFirst}>
                            <div className={css.groupPinnedPostWrapper}>
                                <div className={css.groupPinnedPostTitleContainer}>
                                    <p className={css.groupPinnedPostTitleMain}>Закріплені пости</p>
                                </div>
                                <GroupPinnedPosts />
                            </div>
                        </div>
                        <div className={css.groupStatsContainer}>
                            <div className={css.groupSabs}>
                                <img src={SabsImage} height={19} width={15}/>
                                <p className={css.groupSabsText}>317,731 підписники</p>
                            </div>
                            <div className={css.groupSabs}>
                                <img src={SabsActiveImage} height={19} width={15}/>
                                <p className={css.groupSabsText}>37,731 онлайн</p>
                            </div>
                            <button className={css.groupStatusBtn}>Публічний</button>
                            <p className={css.groupSabsText}>Група створена: 31.12.2024</p>
                        </div>
                    </div>
                    <GroupPost
                        img=""
                        title="Завтра виходить новий УКРАЇНСЬКИЙ фільм “Гонки. Моя остання місія”. Хтось вже має трейлер щоб глянути?"
                    />

                    <GroupPost img={mainPostImg} title="Ти його ще не бачив? Ну ти й клоун. На, дивись"/>
                </div>
            )}
        </>
    );
};

export default Group;
