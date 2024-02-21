import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function SiteCookies() {
  const checkCookies = () => {
    if (typeof document === 'undefined') return;
    console.log(document.cookie.includes('cookies-consent=accepted'));
    return (
      !document.cookie.includes('cookies-consent=accepted') &&
      !document.cookie.includes('cookies-consent=rejected')
    );
  };

  const handleConsent = (consent: 'accepted' | 'rejected') => {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setDate(date.getDay() + 30);
    document.cookie = `cookies-consent=${consent}; expires=${date.toUTCString()}; path=/`;
  };

  return (
    <AlertDialog defaultOpen={checkCookies()}>
      <AlertDialogContent className="focus:outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Cookies Policy</AlertDialogTitle>
          <AlertDialogDescription>
            We use cookies to ensure you get the best experience on our website.{' '}
            <a
              href="/privacy-policy"
              className="text-blue-500 underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              Learn more
            </a>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              handleConsent('rejected');
              location.reload();
            }}
          >
            Reject All
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleConsent('accepted');
              location.reload();
            }}
          >
            Accept All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
