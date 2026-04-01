import Button from "@/src/shared/components/buttons/Button";
import Image from "next/image";
import { BsHouse, BsWallet } from "react-icons/bs";

export default function Home() {
  return (
    <div>
      <Button label="prueba" icon={BsHouse} type="primary" ></Button>
    </div>
  );
}
