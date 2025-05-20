import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import app from "../../../firebase/firebase";
import { NextResponse } from "next/server";

const firestore = getFirestore(app);

export async function POST(req) {
    const data = await req.json();
    console.log("Datos recibidos en el backend:", data);
    try {
        const docRef = doc(collection(firestore, "inventory"));
        await setDoc(docRef, data);
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add document " + error });
    }
}

export async function GET() {
    const snapshot = await getDocs(collection(firestore, "inventory"));
    const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
    return NextResponse.json(data);
}