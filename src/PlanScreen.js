import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import db from "./firebase";
import {
  collection,
  where,
  getDocs,
  query,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
function PlanScreen() {
  const [products, Setproducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, Setsubscription] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "customers", user.uid, "subscriptions"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        Setsubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    });
  }, [user.uid]);

  useEffect(() => {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("active", "==", true));
    getDocs(q).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      Setproducts(products);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51NXfyOSAFhhqsDXGq7RPiEXRqLXVPtMYOCU4RoEsvY99EL9nGP8UBtRhAO02zwcfgfdgKZhpX4N8avq82AAHmDQc00VmWw2n1V"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      <br />
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(subscription?.current_period_end * 1000).toLocaleString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan-disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
