import React from 'react'

function ConfirmationModal({ modalData }) {
    return (
        <div>
            <div>
                <h1>
                    {modalData.text1}
                </h1>

                <p>
                    {modalData.text2}
                </p>

                <div>

                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal