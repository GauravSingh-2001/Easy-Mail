import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const EmailModal = ({ email, onClose}) => {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">

                <div className="bg-white w-3/5 h-3/4 rounded-md shadow-md">
                    <div className="flex bg-red-700 rounded-t justify-between mb-4">

                        <h2 className="text-lg text-gray-200 m-2 font-bold">EasyMail</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-200 hover:text-black focus:outline-none"
                        >
                           <AiOutlineClose size={24} />
                        </button>
                    </div>
                    <div className="flex ml-1 justify-between mb-1"><div className='flex items-start'>
                        <strong className='mr-1'>From: </strong> {email.from?.name ?? email.from}</div></div>
                    <div>
                        <p className="flex ml-1 mb-1"><strong className='mr-1'>To:</strong> {email.to?.name ?? email.to}</p></div>
                    <div>
                        <p className="flex ml-1 mb-2"><strong className='mr-1'>Subject: </strong> {email.subject?.name ?? email.subject}</p></div>
                    <div>
                        <p className="flex mb-2"></p>
                    </div>
                    <div className="flex email-body border-t-8 border-gray-300">
                        <div className='ml-2 mt-2' dangerouslySetInnerHTML={{ __html: email.html }} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailModal;