
import './confirm-modal.css';

interface ConfirmModalProps {
    title: string;
    message: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    cancelButtonText?: string;
    confirmButtonText?: string;
}

const ConfirmModal = ({
    title,
    message,
    isOpen,
    onCancel,
    onConfirm,
    cancelButtonText = 'Cancel',
    confirmButtonText = 'Confirm'
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal__overlay">
            <div className="confirm-modal__container">
                <h2 className="confirm-modal__title">{title}</h2>
                <p className="confirm-modal__message">{message}</p>
                <div className="confirm-modal__actions">
                    <button className="confirm-modal__btn confirm-modal__btn--cancel" onClick={onCancel}>{cancelButtonText}</button>
                    <button className="confirm-modal__btn confirm-modal__btn--confirm" onClick={onConfirm}>{confirmButtonText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
