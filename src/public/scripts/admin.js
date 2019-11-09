function renderPreview() {
    
    var content = document.getElementById('content').value;
    
    var parameters = {
            type: 'preview',
            content: content
    };
    
    doLocalPostRequest('/admin', parameters, function(error, event) {
        
        if (error) {
            console.log(error);
            alert(error);
        } else {
            
            var request = event.target;
            
            if (request.readyState === 4 && request.status === 200) {
                
                var results = JSON.parse(request.responseText);
                
                console.log(results);
                
                setPreviewContents(results);
            }
        }
    });
}

function setPreviewContents(results) {
    
    if (!results.error) {
    
        var preview = document.getElementById('preview');
    
        preview.innerHTML = results.html;
    }
}

function submitProject() {
    
    
    
}