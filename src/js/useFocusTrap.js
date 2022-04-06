import { useRef, useEffect } from "react";
import focusTrap from "modal-focus-trap";

function useFocusTrap() {
  const ref = useRef(null);
  console.log("ref", ref);

  // Create on didMount.
  useEffect(() => {
    const destroy = focusTrap(ref.current);

    // Destroy on willUnmount.
    return destroy;
  }, []);

  return ref;
}

export default useFocusTrap;
