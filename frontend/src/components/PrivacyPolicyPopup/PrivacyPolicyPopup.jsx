import React from 'react';
import css from './PrivacyPolicyPopup.module.css';

const PrivacyPolicyPopup = ({ onAccept, onDecline }) => {
    const handleClosePopup = (e) => {
        if (e.target.id === 'popup-overlay') {
            onDecline();
        }
    };

    return (
        <div
            id="popup-overlay"
            className={css.popupOverlay}
            onClick={handleClosePopup}
        >
            <div className={css.popupContent}>
                <h2>Політика конфіденційності</h2>
                <p>
                    Дякуємо за використання нашого сервісу! Ми дбаємо про вашу конфіденційність.
                    Усі зібрані дані використовуються виключно для покращення вашого досвіду
                    та надання високоякісних послуг.
                </p>
                <hr/>
                <p>
                    Використовуючи наш сервіс, ви погоджуєтеся з наступними умовами:
                </p>
                <ol>
                    <li>Ми можемо збирати інформацію про вашу активність на нашій платформі.</li>
                    <li>Усі персональні дані зберігаються відповідно до чинного законодавства та використовуються
                        виключно з
                        вашого дозволу.
                    </li>
                    <li>Ми можемо використовувати файли cookie для персоналізації вашого досвіду.</li>
                    <li>Ви можете зв'язатися з нами для уточнення або видалення ваших даних.</li>
                </ol>
                <hr/>
                <p>
                    Якщо ви не погоджуєтесь із нашою політикою конфіденційності, ви можете відмовитися від використання
                    нашого сервісу.
                </p>
                <div className={css.popupButtons}>
                    <button onClick={onAccept} className={css.acceptButton}>Прийняти</button>
                    <button onClick={onDecline} className={css.declineButton}>Відхилити</button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPopup;
