'use client'

import SubjectButton from "@/ui/button";
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useState } from "react";

export default function Subjects({ subjects }) {
    const PAGE_SIZE = 5;
    const [page, setPage] = useState(0);
    const [showSubjects, setShowSubjects] = useState(subjects.slice(0, PAGE_SIZE));
    const changeSubjects = (newPage) => {
        const changes = new Array(PAGE_SIZE);
        for (let index = newPage * PAGE_SIZE; index < Math.min(newPage * PAGE_SIZE + PAGE_SIZE, subjects.length); index++) {
            changes[index] = subjects[index];
        }
        return changes;
    }

    const prePage = () => {
        const newPage = Math.max(0, page - 1);
        setPage(newPage);
        setShowSubjects(changeSubjects(newPage));
    }
    const nextPage = () => {
        const newPage = Math.min(page + 1, parseInt(subjects.length / PAGE_SIZE));
        setPage(newPage);
        setShowSubjects(changeSubjects(newPage));
    }
    return (
        <Flex gap="3">
            <IconButton radius="full" color="violet" variant="soft" onClick={prePage}>
                <TriangleLeftIcon color="white" width='100' height='200' />
            </IconButton>
            {showSubjects.map((subject) => <SubjectButton key={subject} value={subject} />)}
            <IconButton radius="full" color="violet" variant="soft" onClick={nextPage}>
                <TriangleRightIcon color="white" width='100' height='200' />
            </IconButton>
        </Flex>
    )
}