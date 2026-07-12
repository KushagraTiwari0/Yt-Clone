document.addEventListener('DOMContentLoaded', () => {
    // Array definition containing data structured to support dynamic loop processing
    const dataset = [
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
            author: "-Mr. John Geller"
        },
        {
            text: "Excellent operational frameworks and strategic advisory tracking models. Our implementation infrastructure across front-facing channels accelerated scaling metrics by substantial margins inside single fiscal execution loops.",
            author: "-Corporate Operations Director"
        }
    ];

    let cursor = 0;
    const txtNode = document.querySelector('.testimonial-box p');
    const authNode = document.querySelector('.testimonial-author');
    const backBtn = document.querySelector('.carousel-arrow.prev');
    const fwdBtn = document.querySelector('.carousel-arrow.next');

    if (txtNode && authNode && backBtn && fwdBtn) {
        function render() {
            txtNode.textContent = dataset[cursor].text;
            authNode.textContent = dataset[cursor].author;
        }

        backBtn.addEventListener('click', () => {
            cursor = (cursor === 0) ? dataset.length - 1 : cursor - 1;
            render();
        });

        fwdBtn.addEventListener('click', () => {
            cursor = (cursor === dataset.length - 1) ? 0 : cursor + 1;
            render();
        });
    }
});