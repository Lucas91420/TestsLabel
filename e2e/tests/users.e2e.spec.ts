import { test, expect } from '@playwright/test';

test.describe('E2E – Users flow', () => {
  test('Créer et lister un utilisateur', async ({ page }) => {
    // 1. Aller sur la page d’accueil
    await page.goto('/');

    // 2. Vérifier qu’un élément clé est visible
    await expect(page.getByRole('heading', { name: /utilisateurs/i })).toBeVisible();

    // 3. Saisir le nom
    const input = page.getByLabel('Nom :');
    await input.fill('Diane');

    // 4. Clic sur "Créer" et attendre le POST /users
    const [response] = await Promise.all([
      page.waitForResponse(resp =>
        resp.url().endsWith('/users') && resp.request().method() === 'POST'
      ),
      page.getByRole('button', { name: 'Créer' }).click()
    ]);
    expect(response.status()).toBe(201);

    // 5. Vérifier que "Diane" est dans la liste
    const items = page.getByRole('listitem');
    await expect(items).toHaveCount(1);
    await expect(items.first()).toHaveText('Diane');
  });
});
