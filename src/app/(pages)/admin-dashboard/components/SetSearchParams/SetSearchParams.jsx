"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SetSearchParams = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const values = ["users", "threads", "polls", "jobs", "blogposts", "comments", "replies", "messages", "notifications", "groups"];

    const content = searchParams.get('content');

    const SetSearchParamsHandle = () => {

        if (!values.includes(content)) {
            const params = new URLSearchParams(searchParams);
            params.set('content', 'users');
            replace(`${pathname}?${params.toString()}`);
        }
    }

    SetSearchParamsHandle();

}

export default SetSearchParams