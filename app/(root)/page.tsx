import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const Page = () => {
    return (
        <>
            {/* CTA Section */}
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview with AI-powered Feedback & Practice</h2>
                    <p className="text-lg">
                        Practice on real interview questions and get instant feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                <Image
                    src="/robot.png"
                    alt="robot"
                    width={400}
                    height={400}
                    className="max-sm:hidden"
                />
            </section>

            {/* Empty State Section */}
            <section className="flex flex-col mt-8 gap-6">
                <h2>Your interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))} {/* ✅ added closing )) */}
                </div>
            </section>

            {/* Interviews Section */}
            <section className="flex flex-col mt-8 gap-6">
                <h2>Take an interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                    {/*<p>You Haven't taken any interviews yet</p>*/}
                </div>
            </section>
        </>
    );
};

export default Page;
