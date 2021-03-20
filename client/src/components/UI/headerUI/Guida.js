import React from "react"
import {Modal ,Button, ModalBody, ModalFooter} from "react-bootstrap"
import "../../style.css"
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
	} = props
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
						<li><strong>Heat Map</strong></li>
						<li><strong>Linear Projection</strong></li>
					</ul>
					<h5>Utilizzo</h5>
					<p>
						Tutte le funzionalità di HDViz sono facilmente reperibili ed nel menu
						laterale a scomparsa. <br/> <em>Inizialmente sono utilizzabili solo le prime voci:</em> 
					</p>	
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<SiJson size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Salva/Carica sessione</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<ImDatabase size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Carica dati dal DB</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<FaFileCsv size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Carica dati da CSV</p>
					</div>
					<p>
						Tutte e tre aprono un modal per compiere le operazoni indicate.
					 	.....
					</p>
					<p>
						<strong>Una volta caricati i dati</strong> è possibile selezionare anche tutte le altre voci del menu.
						Per la preparzione dei dati sono presenti le seguenti voci:
					</p>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<SiGraphcool size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Riduci dimensioni</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<AiOutlineFunction size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Calcola distanza</p>
					</div>
					<p>
						Anche in questo caso le voci apriranno un modal per compiere le operazioni indicate. 
						....
					</p>
					<p>
						In ogni caso l'applicazione di algoritmi di riduzione dimensionale o funzioni per il calcolo della
						distanza non sono obbligatori per la visualizzazione dei dati. È infatti possibile, subito dopo aver 
						caricato i dati, scegliere il grafico che più si preferisce tra quelli proposti, ognuno con la sua voce nel menu:
					</p>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<AiOutlineDotChart size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Scatterplot Matrix</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<IoGrid size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Adjency Matrix</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<RiMistFill size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Heat Map</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<IoShareSocialOutline size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Force Field</p>
					</div>
					<div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
						<IoMoveSharp size={32} style={{marginLeft: "2em"}}/> 
						<p style={{marginTop: "1em", marginLeft: "1em"}}>Linear Projection</p>
					</div>
					<p>
						Una volta selezionata una di queste si aprirà una form sulla destra
						attraverso la quale sarà possibile modificare la visualizzazione del grafico, in termini di 
						dimensioni da applicare agli assi, dimensione per l'applicazione del colore sui punti ecc. <br/>
						<em>Queste form si presentano vuote inizialmente</em> e, seppur variano da grafico a grafico, 
						la struttura base è più o meno sempre simile alla seguente (<strong>Scatterplot Matrix</strong>): 
						(img)... non ho più voglia
					</p>
					<h5>Conclusioni</h5>
					<p>
						Per ogni ulteriore chiarimento sull'utilizzo dell'applicazione è possibile contattarci 
						all'e-mail codebuseterswe@gmail.com. Se vedemo
					</p>
				</>
			</ModalBody>	
			<ModalFooter>
				<Button variant="secondary" onClick={closeModal}>Torna al menù</Button>
			</ModalFooter>
		</Modal>
	)
}

export default Guida