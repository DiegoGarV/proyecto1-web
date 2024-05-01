import gameLogo from '../Imagenes/game logo.png'
import loadingGif from '../Imagenes/loading.gif'

const Loading = () => {
    return (
        <div id="content" style={{
            height:'auto',
            width:'100%', 
            boxSizing: 'border-box',
            backgroundColor:'rgba(250,250,250,0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: '30px',
            marginTop: '30px'
        }}>
            <img src={gameLogo} alt="Logo" style={{ 
                width: '40%',
                height: 'auto',
                marginBottom: '20px'
             }} />
            <div><img src={loadingGif} alt='Cargando' style={{
                width:'90%', 
                heigth:'auto',
            }}></img></div>
        </div>
    )
}

export default Loading