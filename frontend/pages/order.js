import PleaseSignIn from "../components/PleaseSignIn";
import Order from "../components/Orders";

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);
export default OrderPage;
