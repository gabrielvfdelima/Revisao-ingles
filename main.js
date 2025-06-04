const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

function wrapLabels(label) {
    const maxLen = 16;
    if (typeof label !== 'string' || label.length <= maxLen) {
        return label;
    }
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + ' ' + word).length > maxLen && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = currentLine ? currentLine + ' ' + word : word;
        }
    }
    lines.push(currentLine);
    return lines;
}

const requiredTooltipConfig = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    }
                    return label;
                }
            }
        }
    }
};
