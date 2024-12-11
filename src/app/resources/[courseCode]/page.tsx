// import { fetchOrganizationRepositories } from '../../../lib/github';

// export default async function CourseResources({ params }: { params: { courseCode: string } }) {
//     const repositories = await fetchOrganizationRepositories(params.courseCode);

//     return (
//         <div>
//             <h1>Resources for {params.courseCode}</h1>
//             <ul>
//                 {repositories.map((repo) => (
//                     <li key={repo.id}>
//                         <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
//                             {repo.name}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// import { fetchRepositoryContent } from '../../../../lib/github';

// export default async function RepositoryContent({ params }: { params: { repoName: string } }) {
//     const content = await fetchRepositoryContent(params.repoName);

//     return (
//         <div>
//             <h1>Content of {params.repoName}</h1>
//             <ul>
//                 {content.map((item) => (
//                     <li key={item.sha}>
//                         {item.type === 'dir' ? (
//                             <span>📁 {item.name}</span>
//                         ) : (
//                             <a href={item.download_url} target="_blank" rel="noopener noreferrer">
//                                 📄 {item.name}
//                             </a>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
