import React from "react";
import {Modal ,Button, ModalBody, ModalFooter} from "react-bootstrap";
import "../../style.css";
import {AiOutlineDotChart , AiOutlineFunction} from "react-icons/ai";
import {ImDatabase} from "react-icons/im";
import {FaFileCsv} from "react-icons/fa";
import { RiMistFill } from "react-icons/ri";
import { IoGrid, IoShareSocialOutline, IoMoveSharp } from "react-icons/io5";
import {SiGraphcool , SiJson} from "react-icons/si";

function Guida(props) {
	const {
		modalIsOpen,
		closeModal
	} = props;
	return (
		<Modal
			show={modalIsOpen}
			onHide={closeModal}
			id="modal"
		>
			<Modal.Header closeButton>
				<Modal.Title>Guida introduttiva all'utilizzo di HDViz</Modal.Title>
			</Modal.Header>
			<ModalBody>
				<>
					<h5>Scopo</h5>
					<p>
						HDViz vuole essere uno strumento per la visualizzazione di dati con molte dimensioni, utile come supporto 
						alla fase esplorativa dell’analisi dei dati.
					</p>
					<h5>Funzionalità principali</h5>
					<p>
						HDViz fornisce all'analista la possibilità di inserire i propri dati tramite:
					</p>
					<ul>
						<li><em>File CSV preparato precedentemente</em></li>
						<li><em>Query al database</em></li>
						<li><em>Sessione precedentemente salvata in un file JSON</em></li>
					</ul>
					<p>
						I dati potranno essere preparati attraverso algoritmi di riduzione 
						dimensionale o funzioni di calcolo della distanza applicabili in tutte le visualizzazioni 
						che dipendono da tale concetto.
						In particolare vengono forniti i seguenti algoritmi di riduzione dimensionale: 
					</p>
					<ul>
						<li><strong>Fastmap</strong></li>
						<li><strong>LLE</strong></li>
						<li><strong>Isomap</strong></li>
						<li><strong>TSNE</strong></li>
					</ul>
					<p>
						E le seguenti funzioni di calcolo della distanza:
					</p>
					<ul>
						<li><strong>Euclidea</strong></li>
						<li><strong>Canberra</strong></li>
						<li><strong>Chebyshev</strong></li>
						<li><strong>Manhattan</strong></li>
					</ul>
					<p>
						Si potrà quindi scegliere tra 5 diverse visualizzazione dei dati:
					</p>
					<ul>
						<li><strong>Scatterplot Matrix</strong></li>
						<li><strong>Adjency Matrix</strong></li>
						<li><strong>Force Field</strong></li>
						<li><strong>Heat Map</strong></li>
						<li><strong>Linear Projection</strong></li>
					</ul>
					<h5>Utilizzo</h5>
					<p>
						Tutte le funzionalità di HDViz sono facilmente reperibili nel menu
						laterale a scomparsa. <br/> <em>Inizialmente sono utilizzabili solo le prime voci:</em> 
					</p>	
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<SiJson size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Salva/Carica sessione</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<ImDatabase size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" href="https://www.youtube.com/watch?v=MJ0WDG5yX-Y">Carica dati dal DB</a></p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<FaFileCsv size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" href="https://www.youtube.com/watch?v=7NIiFvb8XLY">Carica dati da CSV</a></p>
					</div>
					<p>
						Tutte e tre aprono una finestra per compiere le operazioni indicate. In particolare:
					</p>	
					<ul>
						<li>La finestra per il caricamento dei dati dal DB permette di scegliere uno dei dataset presenti nel DB 
							ed effettuare immediatamente una selezione delle dimensioni da caricare;</li>	
						<li>La finestra per il caricamento dei dati da file CSV permette anche la selezione delle dimensioni che si desidera
						utilizzare (<em>di default vengono utilizzate tutte quelle caricate</em>).</li>	
					</ul>	
					<p>
						<strong>Una volta caricati i dati</strong> è possibile selezionare anche tutte le altre voci del menu.
						Per la preparzione dei dati sono presenti le seguenti voci:
					</p>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<SiGraphcool size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=HSNzSRYAfGc">Riduci dimensioni</a></p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<AiOutlineFunction size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=uEAzlijpLmM">Calcola distanza</a></p>
					</div>
					<p>
						Anche in questo caso le voci apriranno una finestra per compiere le operazioni indicate. In particolare:
					</p>
					<ul>
						<li>La finestra per la riduzione dimensionale permette di scegliere inizialmente quali dimensioni utilizzare 
							per la riduzione, poi quale algoritmo (<em>tra Fastmap, LLE, Isomap e TSNE</em>) e, in base a questa
							ultima scelta una serie di parametri per eseguire la riduzione come più si preferisce;</li>
						<li>La finestra per il calcolo della distanza permette di scegliere inizialmente
							quali dimensioni utilizzare per effettuare il calcolo, poi quale funzione di distanza (<em>tra Euclidea, Camberra, Chebyshev e Manhattan</em>)
							e il nome da dare alla nuova matrice delle distanze creata.
						</li>
					</ul>
					<p>
						In ogni caso l'applicazione di algoritmi di riduzione dimensionale o funzioni per il calcolo della
						distanza non sono obbligatori per la visualizzazione dei dati. È infatti possibile, subito dopo aver 
						caricato i dati, scegliere il grafico che più si preferisce tra quelli proposti, ognuno con la sua voce nel menu:
					</p>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<AiOutlineDotChart size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=1YtSDGRU8N8">Scatterplot Matrix</a></p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<IoGrid size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=UQl7Rl9yRAQ">Adjency Matrix</a></p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<RiMistFill size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=GH6PCy3pm_k">Heat Map</a></p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<IoShareSocialOutline size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=unLz7DA8gW0">Force Field</a></p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<IoMoveSharp size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}><a class="linkTutorial" target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=PISKxPttkQ0">Linear Projection</a></p>
					</div>
					<p>
						Una volta selezionata una di queste si aprirà una finestra sulla destra
						attraverso la quale sarà possibile modificare la visualizzazione del grafico, in termini di 
						dimensioni da applicare agli assi, dimensione per l'applicazione del colore sui punti o,
						per le visualizzazioni che ne fanno uso, è possibile scegliere la matrice delle distanze da utilizzare tra quelle calcolate 
						precedentemente. <em>Da notare come inizialmente tutti i campi siano impostati a "Nessuna dimensione".</em><br/>
						Tale finestra è accompagnata da un pulsante per nasconderla e centrare il grafico nello schermo
						per concentrarsi solamente sull'analisi dello stesso.
					</p>
					<h5>Conclusioni</h5>
					<p>
						Per ogni ulteriore chiarimento sull'utilizzo dell'applicazione è possibile contattarci 
						all'e-mail codebusterswe@gmail.com.
					</p>
				</>
			</ModalBody>	
			<ModalFooter>
				<Button variant="secondary" onClick={closeModal}>Torna al menù</Button>
			</ModalFooter>
		</Modal>
	);
}

export default Guida;