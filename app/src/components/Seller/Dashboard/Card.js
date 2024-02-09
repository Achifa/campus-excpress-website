import '../../../styles/ocerview.css'

const Card = ({title, summary}) => {
    return ( 
        <>
            <div class="card work" style={{marginBottom: '10px'}}>
                <div class="card-desc">
                        
                    <div class="card-time">{title}</div>
                    <p class="recent">{summary}</p>
                </div>
            </div>

        </>
     ); 
}
 
export default Card;