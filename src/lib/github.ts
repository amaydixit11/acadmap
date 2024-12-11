const GITHUB_API_URL = 'https://api.github.com';

// Fetch all repositories in the organization, optionally filtered by courseCode
export async function fetchOrganizationRepositories(courseCode?: string) {
    const url = `${GITHUB_API_URL}/orgs/${process.env.NEXT_PUBLIC_GITHUB_ORG}/repos`;
    console.log(`Fetching from: ${url}`);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    const repos = await response.json();

    // Filter repositories by naming convention if courseCode is provided
    return courseCode
        ? repos.filter((repo: any) => repo.name.startsWith(courseCode))
        : repos;
}

// Fetch details of a specific repository
export async function fetchRepositoryDetails(repoName: string) {
    const url = `${GITHUB_API_URL}/repos/${process.env.NEXT_PUBLIC_GITHUB_ORG}/${repoName}`;
    console.log(`Fetching repository details from: ${url}`);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch repository details: ${response.statusText}`);
    }

    return response.json();
}

// Fetch contents of a repository (files/folders)
export async function fetchRepositoryContent(repoName: string, path: string = '') {
    const url = `${GITHUB_API_URL}/repos/${process.env.NEXT_PUBLIC_GITHUB_ORG}/${repoName}/contents/${path}`;
    console.log(`Fetching repository content from: ${url}`);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch repository content: ${response.statusText}`);
    }

    return response.json();
}

// Create a new repository within the organization
export async function createRepository(repoName: string, description: string) {
    const url = `${GITHUB_API_URL}/orgs/${process.env.NEXT_PUBLIC_GITHUB_ORG}/repos`;
    console.log(`Creating repository: ${url}`);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: repoName,
            description: description,
            private: false, // Set to true if you want the repo to be private
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create repository: ${response.statusText}`);
    }

    return response.json();
}

// Upload a file to a repository
export async function uploadFileToRepository(
    repoName: string,
    filePath: string,
    content: string,
    commitMessage: string
) {
    const url = `${GITHUB_API_URL}/repos/${process.env.NEXT_PUBLIC_GITHUB_ORG}/${repoName}/contents/${filePath}`;
    console.log(`Uploading file to: ${url}`);

    const response = await fetch(url, {
        method: 'PUT',  
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(content).toString('base64'),
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return response.json();
}

// Delete a file from a repository
export async function deleteFileFromRepository(
    repoName: string,
    filePath: string,
    sha: string,
    commitMessage: string
) {
    const url = `${GITHUB_API_URL}/repos/${process.env.NEXT_PUBLIC_GITHUB_ORG}/${repoName}/contents/${filePath}`;
    console.log(`Deleting file from: ${url}`);

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: commitMessage,
            sha: sha,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to delete file: ${response.statusText}`);
    }

    return response.json();
}

// Fetch contributors of a repository
export async function fetchRepositoryContributors(repoName: string) {
    const url = `${GITHUB_API_URL}/repos/${process.env.NEXT_PUBLIC_GITHUB_ORG}/${repoName}/contributors`;
    console.log(`Fetching contributors from: ${url}`);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch contributors: ${response.statusText}`);
    }

    return response.json();
}
