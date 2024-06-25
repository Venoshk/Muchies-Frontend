function truncateText(text, ) {
    if (text.length <= 80) {
        return text;
    } else {
        return text.slice(0, 80) + "...";
    }
}

export default truncateText;
