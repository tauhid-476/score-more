import React from 'react'
import QuestionCard from './QuestionCard';

interface QuesCardSecProps {
    data: ExamAnalysisResponse;
}

function QuesCardSec({ data }: QuesCardSecProps) {
    return (
        <>
            {data.hot.questions.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-destructive mr-2"></span>
                        🔥 Hot Topics ({data.hot.questions.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.hot.questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                question={question}
                                type="hot"
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Cool Questions Section */}
            {data.cool.questions.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#192cc2] mr-2"></span>
                        ❄️ Cool Topics ({data.cool.questions.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.cool.questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                question={question}
                                type="cool"
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Extras Questions Section */}
            {data.extras.questions.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#b6de3f] mr-2"></span>
                        ⭐ Extra Topics ({data.extras.questions.length})
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.extras.questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                question={question}
                                type="extra"
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default QuesCardSec