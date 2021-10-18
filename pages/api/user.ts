import getSession from 'next-auth';
export default async function handle(req, res) {
    const user = await getSession(req);
    
    res.json(user)
}
