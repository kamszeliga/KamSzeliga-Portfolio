function fetchBlogData() {
    const baseURL = "https://dailyroar.up.railway.app/";

    fetch(`${baseURL}api/BlogPosts?num=4`)
        .then((response) => response.json())
        .then(function (blogPosts) {
            //display the blog posts on the page//
            displayBlogs(blogPosts, baseURL)
        })
        .catch((reason) => console.error(reason));

}

function displayBlogs(blogPosts, baseURL) {
    let template = document.getElementById('blog-template');
    let blogSection = document.getElementById('blogs');

    blogPosts.forEach(blogPost => {
        const articleCard = document.importNode(template.content, true);

        //Set blog image link
        let imageDiv = articleCard.querySelector(`[data-blog="imageLink"]`)
        imageDiv.href = `${baseURL}Content/${blogPost.slug}`;

        //create image element
        let blogImage = document.createElement('img');
        if (blogPost.imageData) {
            blogImage.setAttribute('src', `data:${blogPost.imageType};base64,${blogPost.imageData}`);
            blogImage.classList.add("imageSize");
        } else {
            blogImage.setAttribute('src', `${baseURL}img/defaultBlogImage.png`);
            blogImage.classList.add("imageSize");
        }

        //add to template
        imageDiv.appendChild(blogImage);

        //set date on image
        let blogDate = articleCard.querySelector(`[data-blog="day"]`);
        let blogMonth = articleCard.querySelector(`[data-blog="month"]`);
        let createdDate = new Date(blogPost.created);

        blogDate.textContent = createdDate.getDate();
        blogMonth.textContent = createdDate.toLocaleString("default", { month: "long" });

        //set title
        let blogTitle = articleCard.querySelector(`[data-blog="title"]`);

        blogTitle.textContent = blogPost.title;

        //set abstract
        let blogAbstract = articleCard.querySelector(`[data-blog="abstract"]`);

        blogAbstract.textContent = blogPost.abstract;

        //button link
        let buttonLink = articleCard.querySelector(`[data-blog="buttonLink"]`);

        buttonLink.href = `${baseURL}Content/${blogPost.slug}`;

        //updated
        let updatedText = articleCard.querySelector(`[data-blog="updated"]`);

        let today = new Date();
        let updated = new Date(blogPost.updated ? blogPost.updated : blogPost.created);

        let daysAgo = Math.ceil((Math.abs(today.getTime() - updated.getTime())) / (1000 * 60 * 60 * 24));

        updatedText.textContent = (daysAgo == 1 ? "Updated one day ago" : `Updated ${daysAgo} days ago`);

        blogSection.appendChild(articleCard);

    })

}