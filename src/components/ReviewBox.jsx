import DOMPurify from 'dompurify';

export default function ReviewBox({ reviewText }) {
  const safeHTML = DOMPurify.sanitize(reviewText);

  return (
    <div
      className="text-sm"
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}