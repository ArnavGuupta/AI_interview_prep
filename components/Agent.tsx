import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
    CONNECTING = 'CONNECTING'
}

const Agent = ({ username }: AgentProps) => {
    const currentStatus = CallStatus.FINISHED;   // ✅ renamed variable
    const isSpeaking = true;
    const messages = [
        'Whats your Name?',
        'My name is Arnav Gupta Nice to meet you',
    ]
    const lastmessages = messages[messages.length-1]

    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image src="/ai-avatar.png" alt="avatar" width={65} height={54} className="object-cover"/>
                        {isSpeaking && <div className="animate-speak"/>}
                    </div>
                    <h3>{username}</h3>
                </div>

                <div className="card-border">
                    <div className="card-content">
                        <Image src="/user-avatar.png" alt="avatar" width={65} height={54} className="object-cover"/>
                    </div>
                </div>
            </div>

            {messages.length>0 &&(
                <div className="transcript-border">
                    <div className="transcript">
                        <p key = {lastmessages} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
                            {lastmessages}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {currentStatus !== CallStatus.ACTIVE ? (
                    <button className="btn-call">

            <span className={cn("animate-ping opacity-75 rounded-full absolute ",CallStatus !== "CONNECTING" && "hidden")}/>

                        <span>
                            {currentStatus === CallStatus.INACTIVE || currentStatus === CallStatus.FINISHED
                                ? 'Call'
                                : '....'}
                        </span>

                    </button>
                ) : (
                    <button className="btn-disconnect">
                        End
                    </button>
                )}

            </div>
        </>
    );
};

export default Agent;
