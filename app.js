document.addEventListener('DOMContentLoaded', () => {
    let resources = {};
    
    // Load resources from JSON file
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
            resources = data;
            renderFiles('ibdp');
            ibdpTab.classList.add('bg-[#64C8FA]');
        })
        .catch(error => {
            console.error('Error loading resources:', error);
            fileList.innerHTML = '<p class="text-red-500">Failed to load resources. Please try again later.</p>';
        });

    const ibdpTab = document.getElementById('ibdp-tab');
    const igcseTab = document.getElementById('igcse-tab');
    const fileList = document.getElementById('file-list');

    function renderFiles(category) {
        fileList.innerHTML = '';
        resources[category].forEach(file => {
            const fileCard = document.createElement('div');
            fileCard.className = 'bg-[#1A293F] rounded-lg p-4 hover:bg-[#2A394F] transition-colors';
            fileCard.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-medium truncate">${file.name}</h3>
                    <span class="text-xs text-gray-400 ml-2">${file.size}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-400">
                    <span>${file.date}</span>
                    <a href="/resources/${category}/${file.name}" 
                       class="text-[#64C8FA] hover:underline">Download</a>
                </div>
            `;
            fileList.appendChild(fileCard);
        });
    }

    ibdpTab.addEventListener('click', () => {
        ibdpTab.classList.add('bg-[#64C8FA]');
        igcseTab.classList.remove('bg-[#64C8FA]');
        igcseTab.classList.add('bg-[#1A293F]');
        renderFiles('ibdp');
    });

    igcseTab.addEventListener('click', () => {
        igcseTab.classList.add('bg-[#64C8FA]');
        ibdpTab.classList.remove('bg-[#64C8FA]');
        ibdpTab.classList.add('bg-[#1A293F]');
        renderFiles('igcse');
    });

    // Load IBDP by default
    renderFiles('ibdp');
    ibdpTab.classList.add('bg-[#64C8FA]');
});