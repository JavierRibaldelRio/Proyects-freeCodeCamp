
function TimerDashboard(props) {


    const claseStartStop = 'button-dashboard fa-solid ' + ((props.pausado) ? "fa-play" : "fa-pause");

    return (<div id="timer-dashboard">

        <button id="start_stop" className={claseStartStop} onClick={props.handleStartStop.bind(this)} />
        <button id="reset" className='button-dashboard fa-solid fa-rotate' onClick={props.handleReset.bind(this)} />


    </div>

    );
}

TimerDashboard.defaultProps = {

    handleReset: () => { }
}

export default TimerDashboard;