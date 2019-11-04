$(() => {
    $('#search').keyup(() => {
        $.ajax({
            method: 'POST',
            url: '/api/products/instant-search',
            data: {
                search_term: $('#search').val()
            },
            dataType: 'json',
            success: (result) => {
                const data = result.hits.hits

                $('#productSearchResults').empty()

                if (data.length == 0) {
                    $('#productSearchResults').append('Product you are looking for is not found!').addClass('s-flex justify-content-center alert alert-warning')
                } else {
                    $('#productSearchResults').removeClass('s-flex justify-content-center alert alert-warning')

                    for (let product of data) {
                        let html = ''

                        html += '<div class="col">'
                        html += '<div class="card">'
                        html += `<a href="/api/products/${ product._id }">`
                        html += `<img class="card-img-top" src="images/product.jpeg" alt="Card image cap" />`
                        html += '</a>'
                        html += '<div class="card-body">'
                        html += `<h5 class="card-title">Name: ${ product._source.name }</h5>`
                        html += `<p class="card-text">Category: ${ product._source.category.name }</p>`
                        html += `<p class="card-text">$ ${ product._source.price }</p>`
                        html += `<a href="/api/products/${product._source._id}" class="btn btn-primary">Shop</a>`
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'

                        $('#productSearchResults').append(html)                      
                    }
                }
            }
        })
    })
})