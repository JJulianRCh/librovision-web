export default function ReviewCard({ bookreview }) {
    return (
        <div className="border rounded p-4 shadow-md m-2 w-64">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                    <h2 className="font-bold text-lg">
                        {bookreview.title}
                    </h2>
                    <p className="text-sm">{bookreview.author}</p>
                </div>
                <div className="text-yellow-400 font-semibold text-lg">/5</div>
            </div>
            <p className="text-sm font-medium">Publicado por: {bookreview.username}</p>
            <p className="">{bookreview.review}</p>
        </div>
    );
}
