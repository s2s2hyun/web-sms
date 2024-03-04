"use client";

import fireStore from "@/firebase/firestore";
import { doc, getDoc } from "@firebase/firestore";

export default function Home() {
  const ClickButton = async () => {
    const querySnapshot = await getDoc(
      doc(fireStore, "사용자", "3F1MwdM80M8N1apvUkd4")
    );
    console.log(querySnapshot.data());
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div>
          <button onClick={ClickButton}>버튼</button>
        </div>
      </div>
    </main>
  );
}
