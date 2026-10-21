
import {prisma} from "@repo/db/client";

const Home = async ()=>{
  const users = await prisma.user.findMany();  

 return<>
    <div>
       {JSON.stringify(users)}
    </div>
  </>
}
export default Home;

export const dynamic = "force-dynamic";