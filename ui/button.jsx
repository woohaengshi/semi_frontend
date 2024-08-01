import { Button } from "@radix-ui/themes"

export default function SubjectButton({value}) {
    return(
        <Button radius="large" variant='soft' color="violet" >
            {value}
        </Button >
    )
}