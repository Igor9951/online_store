
import { prisma } from '@/app/lib/prisma';
import EditableProduct from '@/app/components/EditableProduct';
import { auth } from '@/app/components/auth';
import UserProductPage from '@/app/components/userProductPage';

export default async function ProductPage({ params }) {
  const param=await params
  const userAuth=await auth();
  const product = await prisma.product.findUnique({
    where: { id: parseInt(param.id,10) },
    include:{
    productImage:true,
    category:true
    }
  })

  if(userAuth){
    if(userAuth.role=='admin'){
      const categories=await prisma.category.findMany();
return <EditableProduct product={product} categories={categories}/>
    }
    return <UserProductPage product={product} />
  }
  else{
return <UserProductPage product={product} />
  }
  
}


