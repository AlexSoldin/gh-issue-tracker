import { Octokit } from "@octokit/rest";
import type { NextApiRequest, NextApiResponse } from 'next'

type Issue = {
    id: number;
    url: string;
    title: string;
    description: string;
    created_at: string;
}

type Data = {
    issues: Array<Issue>;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>) {
    const octokit = new Octokit({
        auth: process.env.GITHUB_AUTH_TOKEN
    });

    const organisation = req.query.org;
    const repo = req.query.repo;

    const issuesResponse = await octokit.request(`GET /repos/${organisation}/${repo}/issues`);
    const issuesList: Array<Issue> = [];
    issuesResponse.data.forEach((element: any) => {
        issuesList.push({
            id: element.id, 
            url: element.url, 
            title: element.title, 
            description: element.description, 
            created_at: element.created_at});
    });
    return res.status(200).json({issues: issuesList});
}