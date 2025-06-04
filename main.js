const sections = document.querySelectorAll('main > section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 
};

function highlightNavLink() {
    let currentSectionId = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if section is at least partially in viewport, prioritizing those closer to top
        if (rect.top <= 100 && rect.bottom >= 100) { // 100px offset for sticky nav
                if (!currentSectionId || document.getElementById(currentSectionId).getBoundingClientRect().top > rect.top) {
                currentSectionId = section.id;
                }
        }
    });

    if (!currentSectionId && window.scrollY < sections[0].offsetTop) {
            // If near top of page before first section, no active link or hero
    } else if (!currentSectionId && window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        // If at the very bottom, highlight the last section
        currentSectionId = sections[sections.length - 1].id;
    }


    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);
window.addEventListener('resize', highlightNavLink);
document.addEventListener('DOMContentLoaded', highlightNavLink);


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