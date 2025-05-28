import Account from "./account";
import BurgerMenu from "./BurgerMenu";
import DesktopNav from "./DesktopNav";
import ProductSearch from "./ProductSeacrh";
import BasketSummary from "./BasketSummery";
export default  function Header({userAuth}){
 return <div className="w-full h-full">
            <header className="bg-black w-full h-[69px] flex justify-between">
              <BurgerMenu userAuth={userAuth}></BurgerMenu>
               <DesktopNav userAuth={userAuth}></DesktopNav>
                <ProductSearch />
               <BasketSummary></BasketSummary>
               <Account userAuth={userAuth}></Account>
           </header>
 </div>
}