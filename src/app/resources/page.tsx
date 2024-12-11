import { fetchOrganizationRepositories } from "@/lib/github";


export default async function CourseResources() {
    const repositories = await fetchOrganizationRepositories();
    // console.log(repositories)
    
    return (
        <div>
            <h1>Resources for Course</h1>
            <ul>
                {repositories.map((repo: any) => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                    </li>
                ))}
                {/* {JSON.stringify(repositories)} */}
            </ul>
        </div>
    );
}