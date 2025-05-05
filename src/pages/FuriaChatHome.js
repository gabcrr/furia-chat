import React, { useState, useEffect, useRef } from "react";
import { messagesRef, addDoc, onSnapshot, query, orderBy, limit } from "./firebase";
import bordaBranca from "../assets/images/borda-branca.svg";
import vectorInsiraNome from "../assets/images/vector-insira-nome.svg";
import line2 from "../assets/images/line-2.svg";
import furiaLogoChat from "../assets/images/furia-logo-chat.png";
import "../styles/FuriaChatHome.css";
import furiaLogo from "../assets/images/furia-logo-header.png";
import cs2Logo from "../assets/images/cs2-logo.png";
import molgolzLogo from "../assets/images/mongolz-logo.png";
import virtusLogo from "../assets/images/virtus-logo.png";
import complexityLogo from "../assets/images/complexity-logo.png";
import apogeeLogo from "../assets/images/apogee-logo.png";
import m80Logo from "../assets/images/m80-logo.png";
import furiaLogoPlacar from "../assets/images/furia-logo-placar.png";
import borda1 from "../assets/images/borda-1.png";
import starFuria from "../assets/images/star-1.svg";
import SombraDireitaFuria from "../assets/images/sombra-furia-1.svg";
import SombraEsquerdaFuria from "../assets/images/sombra-furia-4.svg";
import SombraEsquerdaMongolz from "../assets/images/sombra-mongolz-1.svg";
import SombraEsquerdaVirtus from "../assets/images/sombra-virtus-2.svg";
import SombraEsquerdaComplexity from "../assets/images/sombra-complexity-3.svg";
import SombraDireitaApogee from "../assets/images/sombra-apogee-4.svg";
import SombraEsquerdaMi80 from "../assets/images/sombra-mi80-5.svg";
import vectorNews from "../assets/images/vector-news.svg";

const FuriaChatHome = () => {
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const colors = [
        "#0000FF", "#8A2BE2", "#5F9EA0", "#D2691E", "#FF7F50",
        "#1E90FF", "#B22222", "#DAA520", "#008000", "#FF69B4",
        "#FF4500", "#FF0000", "#2E8B57", "#00FF7F", "#9ACD32"
    ];

    const [userColors, setUserColors] = useState({});

    const validateName = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);
    };

    const sendMessage = async (e) => {
        if (e.key === "Enter" && message.trim() && userName.trim()) {
            e.preventDefault();
            const validName = validateName(userName);
            let userColor = userColors[validName];
            if (!userColor) {
                userColor = colors[Math.floor(Math.random() * colors.length)];
                setUserColors((prev) => ({ ...prev, [validName]: userColor }));
            }

            let botResponse = "";
            if (message.startsWith("/furia")) {
                const furiaResponses = [
                    "VAMO QUE VAMO, FURIAAAAA! 🔥🔥🔥",
                    "A selva vai rugir hoje! 🐆",
                    "FURIA É BRASIL NA CABEÇA! 🇧🇷💪",
                    "Confia na call... VEM VITÓRIA! 🎯",
                    "É FURIA NA ÁREA, RESPEITA! 💥",
                    "Foco, sangue nos olhos e bala na cabeça! 🔫",
                    "Nunca duvide da FURIA. Nunca. 👊",
                    "FURIA TÁ ON! 🚨",
                    "Smoke ta na base, bora avançar com a FURIA! 💨",
                    "Rush B com a FURIA não tem counter! 🅱️💣",
                    "Full buy e confiança. Let's go FURIA! 🧢",
                    "Call certa, mira afiada, coração FURIA! 🧠❤️",
                    "Eco round? Aqui é só highlight! 🤑",
                    "Os gringos tremem quando veem a FURIA! 😎",
                    "FURIA passa o trator sem nem fazer barulho! 🚜",
                    "Cadê o adversário? Já sumiu no primeiro pick. 👀",
                    "FURIA ensinando CS desde sempre. 📚🔫"
                ];
                botResponse = furiaResponses[Math.floor(Math.random() * furiaResponses.length)];
            } else if (message === "/resultado") {
                botResponse = "THE MONGOLZ 2x0 FURIA";
            } else if (message === "/loja") {
                botResponse = '<a href="https://www.furia.gg" target="_blank" rel="noopener noreferrer">https://www.furia.gg</a>';
            } else if (message === "/contato") {
                botResponse = '<a href="https://wa.me/5511993404466" target="_blank" rel="noopener noreferrer">https://wa.me/5511993404466</a>';
            } else if (message === "/meme") {
                const memeResponses = [
                    "Faz o L... de Lenda da FURIA! 🫡",
                    "O gringo nem clicou! 😂",
                    "Rush B sem smoke é arte. 🧑‍🎨",
                    "Caiu na selva, é highlight. 🐆📹",
                    "Aceitei o clutch, aceitei a derrota. 😔",
                    "Plantou a C4 e plantou o medo também. 💣😨",
                    "Coach pediu calma, mas o aim pediu guerra. 🔫🧠",
                    "Comprei Scout, comprei esperança. 🙏",
                    "Joguei igual pro player, só que no aquecimento. 🥶",
                    "Lag é psicológico. Confia. 🤡",
                    "Mira travada? Não... é só estilo. 🕶️",
                    "FURIA tá tão quente que derreteu a mira do adversário. 🔥"
                ];
                botResponse = memeResponses[Math.floor(Math.random() * memeResponses.length)];
            } else if (message.includes("#DIADEFURIA")) {
                botResponse = "#FURIACS na área!";
            } else if (message === "/menu") {
                botResponse = "/furia\n/resultado\n/loja\n/contato\n/meme\n#DIADEFURIA\n/menu";
            }

            await addDoc(messagesRef, {
                username: validName,
                message: message,
                color: userColor,
                timestamp: new Date(),
            });

            if (botResponse) {
                await addDoc(messagesRef, {
                    username: "furiaBOT",
                    message: botResponse,
                    color: "#000000",
                    timestamp: new Date(),
                });
            }

            setMessage("");
        }
    };

    useEffect(() => {
        const q = query(messagesRef, orderBy("timestamp", "desc"), limit(50));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse();
            setMessages(msgList);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="FURIA-chat-teste">
            <div className="div">
                <div className="overlap">
                    <div className="campo-mensagem">
                        <div className="overlap-group">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={sendMessage}
                                placeholder="Digite a sua mensagem"
                                style={{ background: "transparent", border: "none", color: "#dedee0", width: "100%", height: "100%", fontFamily: '"Inter-ExtraBold", Helvetica', fontSize: "14px" }}
                            />
                        </div>
                    </div>

                    <div className="line-wrapper">
                        <img className="line" alt="Line" src={line2} />
                    </div>

                    <div className="overlap-2">
                        <div className="group">
                            <div className="mensagens-chat" style={{ overflowY: "auto", display: "flex", flexDirection: "column" }}>
                                {messages.map((msg) => (
                                    <p key={msg.id} style={{ margin: "5px 0", color: "transparent" }}>
                                        <span style={{ color: msg.username === "furiaBOT" ? "#000000" : msg.color }}>
                                            {msg.username}
                                        </span>
                                        <span style={{ color: "#dedee0", letterSpacing: "0.02px" }}>: </span>
                                        <span
                                            style={{ color: "#dedee0", letterSpacing: "0.02px" }}
                                            dangerouslySetInnerHTML={{ __html: msg.message }}
                                        />
                                    </p>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div className="rectangle" />
                    </div>
                </div>

                <div className="overlap-wrapper">
                    <div className="overlap-3">
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Insira o seu nome"
                            style={{ background: "transparent", border: "none", color: "#ffffff33", width: "80%", height: "100%", fontFamily: '"Inter-ExtraBold", Helvetica', fontSize: "14px", position: "absolute", left: "42px", top: "10px" }}
                        />
                        <img className="vector-2" alt="Vector" src={vectorInsiraNome} />
                    </div>
                </div>

                <div className="overlap-2-3">
                    <div className="placares">
                        <div className="overlap-placares">

                            {/* inicio placar 1 */}
                            <div className="PLACAR-1">
                                <div className="overlap-placar-1">
                                    <div className="borda">
                                        <div className="overlap-6">
                                            <div className="sombra-direita">
                                                <div className="overlap-group-2">
                                                    <div className="retangulo-sombra" />
                                                    <img
                                                        className="triangulo-sombra"
                                                        alt="Sombra Mongolz 1"
                                                        src={SombraDireitaFuria}
                                                    />
                                                </div>
                                            </div>

                                            <div className="sombra-esqueda">
                                                <div className="overlap-7">
                                                    <img
                                                        className="triangulo-sombra-2"
                                                        alt="Triangulo sombra"
                                                        src={SombraEsquerdaMongolz}
                                                    />

                                                    <div className="retangulo-sombra-2" />
                                                </div>
                                            </div>
                                            <img className="borda" alt="Borda" src={bordaBranca} />
                                        </div>
                                    </div>

                                    <div className="furia-2">
                                        <div className="texto-furia-1">FURIA</div>

                                        <div className="overlap-8">
                                            <img
                                                className="furia-logo-6"
                                                alt="Furia logo 1"
                                                src={furiaLogoPlacar}
                                            />

                                            <div className="estrela">
                                                <img className="star" alt="Star" src={starFuria} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="centro-placar">
                                        <div className="overlap-9">
                                            <div className="info">
                                                <div className="texto-info-campeonato-1">
                                                    PGL Major Bucharest
                                                </div>

                                                <div className="texto-data-placar-1">09/04/2025 - BO3</div>
                                            </div>

                                            <div className="texto-resultado">2 - 0</div>
                                        </div>
                                    </div>

                                    <div className="the-molgolz">
                                        <div className="overlap-10">
                                            <div className="text-wrapper-19">MONGOLZ</div>

                                            <div className="the">THE</div>
                                        </div>

                                        <img
                                            className="molgolz-logo"
                                            alt="Molgolz logo"
                                            src={molgolzLogo}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* inicio placar 2 */}
                            <div className="PLACAR-2">
                                <div className="overlap-6">
                                    <div className="borda">
                                        <div className="overlap-6">
                                            <div className="sombra-direita">
                                                <div className="overlap-group-2">
                                                    <div className="retangulo-sombra" />

                                                    <img
                                                        className="triangulo-sombra"
                                                        alt="Triangulo sombra"
                                                        src={SombraDireitaFuria}
                                                    />
                                                </div>
                                            </div>

                                            <div className="sombra-esqueda">
                                                <div className="overlap-7">
                                                    <img
                                                        className="triangulo-sombra-2"
                                                        alt="Triangulo sombra"
                                                        src={SombraEsquerdaVirtus}
                                                    />

                                                    <div className="retangulo-sombra-3" />
                                                </div>
                                            </div>

                                            <img className="borda" alt="Borda" src={bordaBranca} />
                                        </div>
                                    </div>

                                    <div className="furia-3">
                                        <div className="texto-furia-1">FURIA</div>

                                        <div className="overlap-8">
                                            <img
                                                className="furia-logo-6"
                                                alt="Furia Logo 2"
                                                src={furiaLogoPlacar}
                                            />

                                            <div className="estrela">
                                                <img className="star" alt="Star" src={starFuria} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="div-wrapper">
                                        <div className="overlap-9">
                                            <div className="info">
                                                <div className="texto-info-campeonato-2">
                                                    PGL Major Bucharest
                                                </div>

                                                <div className="texto-data-placar">08/04/2025 - BO3</div>
                                            </div>

                                            <div className="texto-resultado-2">2 - 0</div>
                                        </div>
                                    </div>

                                    <div className="virtus-pro">
                                        <div className="text-wrapper-20">VIRTUS.PRO</div>

                                        <img className="img-2" alt="Virtus logo" src={virtusLogo} />
                                    </div>
                                </div>
                            </div>

                            {/* inicio placar 3 */}
                            <div className="PLACAR-3">
                                <div className="overlap-6">
                                    <div className="sombras">
                                        <div className="overlap-6">
                                            <div className="sombra-direita-2">
                                                <div className="overlap-group-2">
                                                    <div className="retangulo-sombra" />

                                                    <img
                                                        className="triangulo-sombra"
                                                        alt="Triangulo sombra"
                                                        src={SombraDireitaFuria}
                                                    />
                                                </div>
                                            </div>

                                            <div className="sombra-esqueda-2">
                                                <div className="overlap-11">
                                                    <img
                                                        className="triangulo-sombra-3"
                                                        alt="Triangulo sombra"
                                                        src={SombraEsquerdaComplexity}
                                                    />

                                                    <div className="retangulo-sombra-4" />
                                                </div>
                                            </div>

                                            <img className="borda" alt="Borda" src={bordaBranca} />
                                        </div>
                                    </div>

                                    <div className="furia-4">
                                        <div className="texto-furia-1">FURIA</div>

                                        <div className="overlap-8">
                                            <img
                                                className="furia-logo-6"
                                                alt="Furia logo"
                                                src={furiaLogoPlacar}
                                            />

                                            <div className="star-wrapper">
                                                <img className="star" alt="Star" src={starFuria} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="centro-placar-2">
                                        <div className="overlap-12">
                                            <div className="info-2">
                                                <div className="texto-info-campeonato-3">
                                                    PGL Major Bucharest
                                                </div>

                                                <div className="text-wrapper-23">07/04/2025 - BO3</div>
                                            </div>

                                            <div className="texto-resultado-3">2 - 1</div>
                                        </div>
                                    </div>

                                    <div className="complexity">
                                        <div className="complexity-2">COMPLEXITY</div>

                                        <img
                                            className="img-2"
                                            alt="Complexity logo"
                                            src={complexityLogo}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* inicio placar 4 */}
                            <div className="PLACAR-4">
                                <div className="overlap-6">
                                    <div className="borda">
                                        <div className="overlap-6">
                                            <div className="sombra-direita">
                                                <div className="overlap-group-2">
                                                    <div className="retangulo-sombra-5" />

                                                    <img
                                                        className="triangulo-sombra"
                                                        alt="Triangulo sombra"
                                                        src={SombraDireitaApogee}
                                                    />
                                                </div>
                                            </div>

                                            <div className="sombra-esqueda">
                                                <div className="overlap-7">
                                                    <img
                                                        className="triangulo-sombra-2"
                                                        alt="Triangulo sombra"
                                                        src={SombraEsquerdaFuria}
                                                    />

                                                    <div className="retangulo-sombra-6" />
                                                </div>
                                            </div>

                                            <img className="borda" alt="Borda" src={bordaBranca} />
                                        </div>
                                    </div>

                                    <div className="apogee">
                                        <img
                                            className="apogee-logo"
                                            alt="Apogee logo"
                                            src={apogeeLogo}
                                        />

                                        <div className="overlap-13">
                                            <div className="esports-4">ESPORTS</div>

                                            <div className="apogee-4">APOGEE</div>
                                        </div>
                                    </div>

                                    <div className="centro-placar-3">
                                        <div className="overlap-14">
                                            <div className="info-3">
                                                <div className="texto-data-placar">06/04/2025 - BO3</div>

                                                <div className="texto-info-campeonato-4">
                                                    PGL Bucharest 2025
                                                </div>
                                            </div>

                                            <div className="texto-resultado-4">2 - 0</div>
                                        </div>
                                    </div>

                                    <div className="furia-5">
                                        <div className="text-wrapper-20">FURIA</div>

                                        <div className="overlap-15">
                                            <img
                                                className="img-2"
                                                alt="Furia logo"
                                                src={furiaLogoPlacar}
                                            />

                                            <div className="img-wrapper">
                                                <img className="star" alt="Star" src={starFuria} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* inicio placar 5 */}
                            <div className="PLACAR-5">
                                <div className="overlap-6">
                                    <div className="borda">
                                        <div className="overlap-6">
                                            <div className="sombra-direita-3">
                                                <div className="overlap-group-3">
                                                    <div className="retangulo-sombra-7" />

                                                    <img
                                                        className="triangulo-sombra-4"
                                                        alt="Triangulo sombra"
                                                        src={SombraDireitaFuria}
                                                    />
                                                </div>
                                            </div>

                                            <div className="sombra-esqueda-3">
                                                <div className="overlap-16">
                                                    <img
                                                        className="triangulo-sombra-5"
                                                        alt="Triangulo sombra"
                                                        src={SombraEsquerdaMi80}
                                                    />

                                                    <div className="retangulo-sombra-8" />
                                                </div>
                                            </div>

                                            <img className="borda" alt="Borda" src={bordaBranca} />
                                        </div>
                                    </div>

                                    <div className="furia-3">
                                        <div className="texto-furia-1">FURIA</div>

                                        <div className="overlap-8">
                                            <img
                                                className="furia-logo-6"
                                                alt="Furia logo"
                                                src={furiaLogoPlacar}
                                            />

                                            <div className="estrela">
                                                <img className="star" alt="Star" src={starFuria} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="centro-placar-4">
                                        <div className="overlap-17">
                                            <div className="info-4">
                                                <div className="texto-info-campeonato-5">
                                                    BLAST Spring Showdown
                                                </div>

                                                <div className="text-wrapper-28">22/03/2025 - BO3</div>
                                            </div>

                                            <div className="texto-resultado-5">2 - 1</div>
                                        </div>
                                    </div>

                                    <div className="m">
                                        <div className="m-2">M80</div>

                                        <img className="logo" alt="Logo" src={m80Logo} />
                                    </div>
                                </div>
                            </div>

                            <div className="bordas-pretas">
                                <img
                                    className="borda-2"
                                    alt="Borda"
                                    src={borda1} />

                                <img
                                    className="borda-3"
                                    alt="Borda"
                                    src={borda1} />

                                <img
                                    className="borda-4"
                                    alt="Borda"
                                    src={borda1} />

                                <img className="borda-5"
                                    alt="Borda"
                                    src={borda1} />

                                <img
                                    className="borda-6"
                                    alt="Borda"
                                    src={borda1} />
                            </div>

                            <div className="divisao-interna">
                                <div className="placar-2" />

                                <div className="placar-3" />

                                <div className="placar-4" />

                                <div className="placar-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rectangle-2" />

                    <div className="rectangle-3" />

                    <div className="rectangle-4" />

                    <div className="rectangle-5" />

                    <div className="logo-cs">
                        <div className="text-wrapper-30">Jogos Recentes</div>
                        <div className="text-wrapper-31">CS2</div>
                        <img
                            className="image"
                            alt="CS2 Logo"
                            src={cs2Logo} />
                    </div>
                </div>

                <div className="overlap-18">
                    <div className="noticia">
                        <div className="noticias">
                            <div className="text-wrapper-32">Notícias FURIOSAS</div>
                            <div className="text-wrapper-33">Top News</div>
                            <img
                                className="vector-3"
                                alt="Vector"
                                src={vectorNews} />
                        </div>
                    </div>

                    <div className="noticia-2">
                        <div className="overlap-19">
                            <p className="texto-noticia-5">
                                FalleN divulga primeiro PUG da nova FURIA na Europa
                            </p>
                        </div>
                    </div>

                    <div className="noticia-3">
                        <div className="overlap-19">
                            <p className="texto-noticia-4">
                                FURIA apresenta ex-Falcons como novo auxiliar técnico
                            </p>
                        </div>
                    </div>

                    <div className="noticia-4">
                        <div className="overlap-19">
                            <p className="texto-noticia-2">
                                FURIA pode reforçar comissão técnica com cazaque ex-AVANGAR
                            </p>
                        </div>
                    </div>

                    <div className="noticia-5">
                        <div className="overlap-19">
                            <p className="texto-noticia-1">
                                Em vlog, FalleN mostra chegada de molodoy no bootcampo
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="vector-wrapper">
                    <img className="vector-4" alt="Vector" src={vector2} />
                </div>

                <div className="group-wrapper">
                    <img className="group-2" alt="Group" src={group1} />
                </div>

                <div className="overlap-21">
                    <img className="group-2" alt="Group" src={group2} />
                </div> */}
            </div>

            <header className="header">
                <div className="overlap-20">
                    <div className="luz" />

                    <div className="faixa" />

                    <div className="titulo">
                        <img className="furia-logo-7" alt="Furia logo" src={furiaLogo} />

                        <div className="text-wrapper-36">FURIA Chat</div>
                    </div>
                </div>
            </header>

        </div>
    );
};

export default FuriaChatHome;