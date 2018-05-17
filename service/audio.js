class Audio {
	constructor(){
		this.synth = new Tone.AMSynth().toMaster();
	}

	changePitch(value) {
		this.synth.triggerAttack(value);
	}

	release(){
		this.synth.triggerRelease();
	}

	changeVolume(value) {
		this.synth.volume.value = value; 
	}
}

export default Audio;