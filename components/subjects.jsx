import SubjectButton from "@/ui/button";
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";

export default function Subjects({ subjects }) {
    return (
        <Flex gap="3">
            <IconButton radius="full" color = "violet" variant="soft">
                <TriangleLeftIcon color="white" width='100' height='200'/>
            </IconButton>
            {subjects.map(subject => <SubjectButton key={subject} value={subject} />)}
            <IconButton radius="full" color = "violet" variant="soft">
                <TriangleRightIcon color="white" width='100' height='200'/>
            </IconButton>
        </Flex>
    )
}