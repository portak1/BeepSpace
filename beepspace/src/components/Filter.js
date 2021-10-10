function Filter(pararms){

    const imageStyle={
        background: "url("+pararms.backgroundImage+")"
    }
    const filterStyle = {
        backgroundColor: pararms.filterColor
    }
    return (
        <div className="background">
            <div class="image" style={imageStyle}></div>
            <div class="filter" style={filterStyle}></div>
        </div>
    );
}


export default Filter;