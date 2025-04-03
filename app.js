document.addEventListener('DOMContentLoaded', () => {
    let resources = {};
    
    // Load resources from JSON file
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
            resources = data;
            
            // Handle resources on index page
            if (document.getElementById('resources')) {
                data.ibdp.forEach(resource => {
                    const resourceElement = document.createElement('div');
                    resourceElement.className = 'bg-[#1A293F] p-4 rounded-lg hover:bg-[#2A394F] transition-colors';
                    resourceElement.innerHTML = `
                        <h3 class="text-xl font-semibold mb-2">${resource.name}</h3>
                        <p class="text-gray-300 mb-3">${resource.description}</p>
                        <a href="${resource.link}" class="text-[#64C8FA] hover:underline" target="_blank">View Resource</a>
                    `;
                    document.getElementById('resources').appendChild(resourceElement);
                });
            }

            // Handle resources on IGCSE page
            if (document.getElementById('igcse-resources')) {
                data.igcse.forEach(resource => {
                    const resourceElement = document.createElement('div');
                    resourceElement.className = 'bg-[#1A293F] p-4 rounded-lg hover:bg-[#2A394F] transition-colors';
                    resourceElement.innerHTML = `
                        <h3 class="text-xl font-semibold mb-2">${resource.name}</h3>
                        <p class="text-gray-300 mb-3">${resource.description}</p>
                        <a href="${resource.link}" class="text-[#64C8FA] hover:underline" target="_blank">View Resource</a>
                    `;
                    document.getElementById('igcse-resources').appendChild(resourceElement);
                });
            }

            // Handle tabbed interface if it exists
            const ibdpTab = document.getElementById('ibdp-tab');
            const igcseTab = document.getElementById('igcse-tab');
            const fileList = document.getElementById('file-list');

            if (ibdpTab && igcseTab && fileList) {
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
            }
        })
        .catch(error => {
            console.error('Error loading resources:', error);
            const errorElement = document.createElement('p');
            errorElement.className = 'text-red-500';
            errorElement.textContent = 'Failed to load resources. Please try again later.';
            
            if (document.getElementById('resources')) {
                document.getElementById('resources').appendChild(errorElement);
            }
            if (document.getElementById('igcse-resources')) {
                document.getElementById('igcse-resources').appendChild(errorElement.cloneNode(true));
            }
            if (document.getElementById('file-list')) {
                document.getElementById('file-list').innerHTML = '<p class="text-red-500">Failed to load resources. Please try again later.</p>';
            }
        });
});
