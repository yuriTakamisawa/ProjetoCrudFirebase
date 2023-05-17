import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, onSnapshot, query, where, getDocs, orderBy, limit, deleteDoc, } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDFV1pY6slW5tu5AIBWdBWbMatjDK-fSyw",
    authDomain: "projetonode-430c0.firebaseapp.com",
    projectId: "projetonode-430c0",
    storageBucket: "projetonode-430c0.appspot.com",
    messagingSenderId: "353426741859",
    appId: "1:353426741859:web:e7c915054b3c5cfc90b656"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore();

const cardapio = doc(firestore, 'cardapio/17-04-2023');


function addNovaColecao() {
    const docData = {
        descricao: 'Feijoada',
        preco: 20,
        vegano: false,
    };
    setDoc(cardapio, docData, { merge: true })

        .then(() => {
            console.log('Valor foi adicionado na database.');
        })
        .catch((error) => {
            console.log('Ocorreu um erro: ${error}');
        });
}


const orderCollection = collection(firestore, 'pedidos');

async function addNovoDocumento() {
    const newDoc = await addDoc(orderCollection, {
        cliente: 'Roberta',
        bebida: 'Cafe',
        precoTotal: (100 + Math.floor(Math.random() * 400)) / 100,
    })
    console.log(`Documento criado em ${newDoc.path}`);

}

async function readUnicoDocumento() {
    const mySnapshot = await getDoc(especialDoDia);
    if (mySnapshot.exists()) {
        const docData = mySnapshot.data();
        console.log(`O dado é: ${JSON.stringify(docData)}`);
    }
}

async function readVariosDocumentos() {
    const pedidosClientesQuery = query(
        collection(firestore, 'pedidos'),
        where('bebida', '==', 'Cafe'),
        orderBy('precoTotal'),
        limit(10)
    );
    // const querySnapshot = await getDocs(pedidosClientesQuery);
    onSnapshot(pedidosClientesQuery, (querySnapshot) => {
        console.log(JSON.stringify(querySnapshot.docs.map((e) => e.data())))
    })
    // const allDocs = querySnapshot.forEach(snap => {
    //     console.log(`Documento ${snap.id} contem ${JSON.stringify(snap.data())}`)
    // });
}


async function deletePedidos() {
    const pedidosClientesQuery = query(
        collection(firestore, 'pedidos'),
        where('bebida', '==', 'Cerveja'),
        limit(10)
    );

    const querySnapshot = await getDocs(pedidosClientesQuery);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref)
            .then(() => {
                console.log('Pedido excluído com sucesso.');
            })
            .catch((error) => {
                console.log('Ocorreu um erro ao excluir o pedido:', error);
            });
    });
}

console.log('Hello firebase.');
addNovaColecao();
// addNovoDocumento();
// readUnicoDocumento();
// readVariosDocumentos();
// deletePedidos();
