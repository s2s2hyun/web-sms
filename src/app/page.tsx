"use client";

import fireStore from "@/firebase/firestore";
import { doc, collection, getDoc, addDoc } from "@firebase/firestore";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  //
  const [docRefId, setDocRefId] = useState("");
  //
  const [collectionFb, setCollectionFb] = useState(`auth`);
  //

  const [subCollectionFb, setSubCollectionFb] = useState("student");

  const ClickButton = async () => {
    const querySnapshot = await getDoc(doc(fireStore, collectionFb, docRefId));
    console.log(querySnapshot.data());
  };

  const onClickUpLoadButton = async () => {
    try {
      // 새로운 문서를 추가하고 생성된 문서의 참조를 받습니다.
      const docRef = await addDoc(collection(fireStore, `auth`), {
        name,
        age,
      });

      // 생성된 문서의 ID를 콘솔에 출력합니다.
      console.log("문서 생성됨, 문서 ID:", docRef.id);
      setDocRefId(docRef.id);
    } catch (error) {
      // 에러 처리
      console.error("문서 생성 에러:", error);
    }
  };

  async function addStudent() {
    try {
      // `/auth/GV7BamDAjyTDaXOo7vip` 문서에 대한 참조를 생성합니다.
      const authDocRef = doc(fireStore, collectionFb, docRefId);

      // `student` 서브컬렉션에 새로운 문서를 추가합니다.
      const studentDocRef = await addDoc(
        collection(authDocRef, subCollectionFb),
        {
          name: "학생 이름", // 여기에 실제 학생 이름을 넣습니다.
          age: 20, // 여기에 실제 학생 나이를 넣습니다.
        }
      );

      console.log("새로운 학생 문서 추가됨, 문서 ID:", studentDocRef.id);
    } catch (error) {
      console.error("문서 추가 에러:", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div>
          <button onClick={ClickButton}>버튼</button>
        </div>

        <div className="ml-3">
          <button onClick={onClickUpLoadButton}>새로운 컬렉션추가</button>
        </div>

        <div className="ml-8">
          <button onClick={addStudent}>새로운 학생추가</button>
        </div>
      </div>
    </main>
  );
}
