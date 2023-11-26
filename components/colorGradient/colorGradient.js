function ColorGradient(color) {
    // console.log(color)
    if (color == 'light-100') {
        return ('#22CC92');
    }
    if (color == 'light-200') {
        return ('#29937E');
    }
    if (color == 'dark-100') {
        return ('#5C9794');
    }
    if (color == 'dark-200') {
        return ('#387F7F');
    }
    if (color =='dark-thin'){
        return '#3E5E41'    
    }
    if (color =='dark-thick'){
        return '#13362C'    
    }
    else {
        return ('#000000');
    }

}

export default ColorGradient;
